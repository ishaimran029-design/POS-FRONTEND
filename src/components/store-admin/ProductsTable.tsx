import ProductRow from "./ProductRow"

export default function ProductsTable({ data }: any) {

    return (

        <div className="bg-white rounded-[40px] shadow-xl shadow-slate-200/50 border border-slate-50 overflow-hidden animate-fade-in">

            <div className="overflow-x-auto">

                <table className="w-full text-sm">

                    <thead>

                        <tr className="bg-slate-50/50 border-b border-slate-100">

                            <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 w-12">#</th>
                            <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Product Name</th>
                            <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">SKU</th>
                            <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Barcode</th>
                            <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                            <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Purchase</th>
                            <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Selling</th>
                            <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Stock</th>
                            <th className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400 w-24">Actions</th>

                        </tr>

                    </thead>

                    <tbody className="divide-y divide-slate-50">

                        {data.length > 0 ? (
                            data.map((p: any, i: number) => (
                                <ProductRow key={p.id} product={p} index={i + 1} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan={9} className="px-5 py-20 text-center text-slate-400 font-medium">
                                    No products found. Start by adding one!
                                </td>
                            </tr>
                        )}

                    </tbody>

                </table>

            </div>

        </div>

    )

}
