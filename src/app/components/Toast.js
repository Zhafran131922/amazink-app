'use client';
import { useEffect } from 'react';


export default function Toast({ message, type = 'info', onClose }) {
useEffect(() => {
if (!message) return;
const t = setTimeout(() => onClose(), 3500);
return () => clearTimeout(t);
}, [message]);


if (!message) return null;


const bg = type === 'error' ? 'bg-red-600' : 'bg-green-600';


return (
<div className={`fixed right-4 top-6 z-50 ${bg} text-white px-4 py-2 rounded shadow`}>
{message}
</div>
);
}