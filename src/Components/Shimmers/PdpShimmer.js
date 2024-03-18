function PdpShimmer() {
    return (
        <div>
            <div className=" animate-pulse grid grid-cols-2 gap-4 p-6 bg-white">
                <div className="bg-slate-200"> </div>
                <div className="text-left bg-white">
                    <div>
                        <p className="bg-slate-200 mb-2 p-1 w-1/2 rounded-xl"></p>
                    </div>
                    <div>
                        <p className="bg-slate-200 w-1/2 text-stone-500 border-b-2 my-4  p-1 rounded-xl"></p>
                        <p className="bg-slate-200 w-1/3 text-sm my-2 border-b-2  p-1 rounded-xl"></p>
                    </div>
                    <div>
                        <p className="bg-slate-200 w-1/4 text-stone-500 border-b-2 my-4  p-1 rounded-xl"></p>
                        <p className="bg-slate-200 w-1/4 text-sm my-2 border-b-2 p-1 rounded-xl"></p>
                    </div>
                    <div>
                        <p className="bg-slate-200 w-1/3 text-stone-500 border-b-2 my-4  p-1 rounded-xl"></p>

                    </div>
                    <div>
                        <p className="bg-slate-200 w-1/4 text-stone-500 border-b-2 my-4 p-1 rounded-xl "></p>
                        <div className="border-b-2 my-4">
                            <div className="grid grid-cols-2 gap-9 mb-4">
                                <div className="flex h-10">
                                    <div className="flex justify-center text-left">
                                        <button className="bg-slate-200 p-1 mr-2 text-md border rounded-lg text-white text-center w-16"></button>
                                        <p className="bg-slate-200 p-1 border rounded-lg w-16 text-center"></p>
                                        <button className="bg-slate-200 p-1 ml-2 text-md  w-16 text-center border rounded-lg "></button>
                                    </div>

                                </div>
                            </div>

                        </div>

                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PdpShimmer;