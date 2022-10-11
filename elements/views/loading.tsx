import { useLoading } from "../../hooks/useLoading"

export default function Loading() {
    const [loading] = useLoading()
    if(loading) {
        return (
            <div style={{zIndex: 99998, height: "calc(100vh - 93px)"}} className="w-screen absolute mt-[93px] flex justify-center items-center backdrop-blur-lg bg-[rgba(71,85,115,0.6)]">
                <div style={{zIndex: 99999}} id="loading-container" className="h-[14rem] w-[14rem] aspect-square relative">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        )
    } else {
        return (
            <>
            </>
        )
    }
}