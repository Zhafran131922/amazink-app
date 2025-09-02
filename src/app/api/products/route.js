import client from '../../../../lib/axiosClient';
import { NextResponse } from 'next/server';


export async function GET(request) {
try {
const { searchParams } = new URL(request.url);
// forward relevant query params supported by dummyjson
const params = {};
['limit', 'skip', 'q', 'select', 'sortBy', 'order', 'category'].forEach((k) => {
const v = searchParams.get(k);
if (v) params[k] = v;
});


let url = '/products';
// if category param present, use category endpoint
if (params.category) {
// category may be name (e.g., smartphones)
url = `/products/category/${encodeURIComponent(params.category)}`;
// remove category from params
delete params.category;
}


const res = await client.get(url, { params });
return NextResponse.json(res.data);
} catch (err) {
console.error(err);
return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
}
}


export async function POST(request) {
try {
const body = await request.json();
// DummyJSON supports POST /products/add
const res = await client.post('/products/add', body);
return NextResponse.json(res.data);
} catch (err) {
console.error(err);
return NextResponse.json({ error: 'Failed to add product' }, { status: 500 });
}
}