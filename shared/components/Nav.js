import Link from 'next/link';

export default function Nav ({ includeHomePage = false }) {
    return (
        <nav className={ includeHomePage ? ("flex justify-content-between align-items-center") : ("text-align-right") }>
            { includeHomePage ? (
                <Link href="/">
                    <a className="text text-bold">Home</a>
                </Link>
            ) : (null) }

            <Link href="/settings">
                <a>
                    <svg className="gear" width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.259 13.1085C22.3331 9.34485 27.6669 9.34485 28.741 13.1085C29.3172 15.1274 31.3913 16.3249 33.4279 15.8145C37.2243 14.8628 39.8912 19.482 37.1689 22.294C35.7085 23.8025 35.7085 26.1975 37.1689 27.706C39.8912 30.518 37.2243 35.1372 33.4279 34.1856C31.3913 33.6751 29.3172 34.8726 28.741 36.8915C27.6669 40.6551 22.3331 40.6551 21.259 36.8915C20.6828 34.8726 18.6087 33.6751 16.5721 34.1856C12.7757 35.1372 10.1088 30.518 12.8311 27.706C14.2915 26.1975 14.2915 23.8025 12.8311 22.294C10.1088 19.482 12.7757 14.8628 16.5721 15.8145C18.6087 16.3249 20.6828 15.1274 21.259 13.1085Z" fill="#090909"/>
                        <circle cx="25" cy="25" r="4.54545" />
                    </svg>
                </a>    
            </Link> 
        </nav>
    );
}