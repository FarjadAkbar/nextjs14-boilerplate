import Image from "next/image";

export default function Loading() {
    // Or a custom loading skeleton component
    return <div className="loading-container">
        <Image src="/images/loading.gif" width={30} height={30} alt="loader" />
    </div>
}