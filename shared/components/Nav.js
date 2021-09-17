import Image from 'next/image';

export default function Nav () {
    return (
        <nav className="text-align-right">
            <Image
                src="/assets/gear.svg"
                alt="gear icon"
                width={ 50 }
                height={ 50 } />
        </nav>
    );
}