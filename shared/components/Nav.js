import Image from 'next/image';
import Link from 'next/link';

export default function Nav ({ includeHomePage = false }) {
    return (
        <nav className={ includeHomePage ? ("flex justify-content-between align-items-center") : ("text-align-right") }>
            { includeHomePage ? (
                <Link href="/">
                    <a>Home</a>
                </Link>
            ) : (null) }

            <Image
                src="/assets/gear.svg"
                alt="gear icon"
                width={ 50 }
                height={ 50 } />
        </nav>
    );
}