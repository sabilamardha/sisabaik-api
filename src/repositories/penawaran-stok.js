import { transasksi } from "../db/transaksi.js";
import { HttpError, filterValid, halamanValid, metaHalaman } from "../lib/api.js";
import { kePenawaran } from "../penawaran.js";

const gabung = "FROM penawaran p JOIN penyedia py ON py.id = p.penyedia_id"
const STOK_MAKS = 2147483647;

export function stokMinValid(query) {
    const v = query?.stokMin;
    
    if (v === undefined || v === null || v === "") {
    return 0;
}

if (Array.isArray(v)) {
    throw new HttpError(400, "VALIDATION_ERROR", "Parameter stokMin tidak boleh diulang.");
}

if (typeof v !== "string") {
    throw new HttpError(400, "VALIDATION_ERROR", "Format stokMin tidak valid.");
}

if (!/^(0|[1-9]\d*)$/.test(v)) {
    throw new HttpError(400, "VALIDATION_ERROR", "Format stokMin harus berupa angka bulat nonnegatif.");
}

const angka = Number(v);
if (angka > 2147483647) {
    throw new HttpError(400, "VALIDATION_ERROR", "Nilai stokMin melebihi batas maksimum (2147483647).");
}
    return angka;
}

export async function daftarPenawaranDenganStokMin(query) {
    const filter = filterValid(query);
    const paging = halamanValid(query);
    const stokMin = stokMinValid(query);

    const kondisi = [];
    const params = [];

    params.push(stokMin);
    kondisi.push(`p.stok >= $${params.length}`);
    
    if (filter.q) {
        params.push(`%${filter.q}%`);
        const idx = params.length;
        kondisi.push(`(p.nama ILIKE $${idx} OR py.nama_usaha ILIKE $${idx})`);
    }

    if (filter.kategori) {
        params.push(filter.kategori);
        kondisi.push(`p.kategori = $${params.length}`);
    }
    
    if (filter.status) {
        params.push(filter.status);
        kondisi.push(`p.status = $${params.length}`);
    }
    
    if (filter.tersedia) {
        kondisi.push(`p.status = 'AKTIF' AND p.stok > 0 AND p.waktu_berakhir > NOW()`);
    }

const klausaWhere = kondisi.length > 0 ? `WHERE ${kondisi.join(" AND ")}` : "";

return await transaksi(async (client) => {
    const sqlCount = `SELECT COUNT(*)::int AS jumlah ${gabung} ${klausaWhere};`;
    const resCount = await client.query(sqlCount, params);
    const jumlah = resCount.rows[0].jumlah;

    const paramsSelect = [...params];
    paramsSelect.push(paging.limit);
    const idxLimit = paramsSelect.length;

    paramsSelect.push(paging.offset);
    const idxOffset = paramsSelect.length;

    const sqlSelect = `
    SELECT p.*, py.nama_usaha
    ${gabung}
    ${klausaWhere}
    ORDER BY p.id DESC
    LIMIT $${idxLimit} OFFSET $${idxOffset};
    `;

    const resSelect = await client.query(sqlSelect, paramsSelect);
    const data = resSelect.rows.map(kePenawaran);

    const meta = {
        ...metaHalaman(jumlah, paging),
        ...filter,
        stokMin,
    };

    return { data, meta };
  }, true);
}