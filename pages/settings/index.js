import Link from "next/link";
import Nav from "../../shared/components/Nav";

export default function Settings () {
    return (
        <div className="container">
            <Nav includeHomePage={ true } />

            <Link href="/settings/all-questions">
                <a className="text text-bold text-underline">
                    all questions
                </a> 
            </Link>

            <div className="flex justify-content-between align-items-center mt-2">
                <label
                    htmlFor="dark-mode"
                    className="text text-bold text-underline">
                    dark mode
                </label>
                <label
                    htmlFor="dark-mode"
                    className="dark-mode-checkbox"></label>
                <input
                    type="checkbox"
                    className="d-none"
                    id="dark-mode" />
            </div>
        </div>
    );
}