import Image from 'next/image';


export default function Success() {
    return (<>

        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Image
                src="/images/success.png" // Route of the image file
                height={500} // Desired size with correct aspect ratio
                width={500} // Desired size with correct aspect ratio
                alt="Your Name"
            />
            <h1 style={{ fontSize: "5vw" }}>感謝您的評分！</h1>
        </div>
    </>

    );
}