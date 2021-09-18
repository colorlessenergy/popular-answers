import { Fragment } from 'react';
import Head from 'next/head';
import Link from 'next/link';

import Nav from '../../shared/components/Nav';

export default function Settings () {
    const handleDarkMode = () => {
        if (!localStorage.getItem('theme')) {
            localStorage.setItem('theme', 'light');
        }

        if (localStorage.getItem('theme') === 'light') {
            localStorage.setItem('theme', 'dark');
            document.body.classList.add('dark')
        } else {
            localStorage.setItem('theme', 'light');
            document.body.classList.remove('dark')
        }
    }

    const isDefaultChecked = () => {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('theme') === 'dark') {
            return true;
        }

        return false;
    }

    return (
        <Fragment>
            <Head>
                <title>settings - popular answers</title>
                <meta name="description" content="settings - popular answers" />
            </Head>
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
                        className="text text-bold text-underline cursor-pointer">
                        dark mode
                    </label>
                    <input
                        type="checkbox"
                        className="d-none dark-mode-input"
                        onClick={ handleDarkMode }
                        defaultChecked={ isDefaultChecked() }
                        id="dark-mode" />
                    <label
                        htmlFor="dark-mode"
                        className="dark-mode-checkbox cursor-pointer"></label>
                </div>
            </div>
        </Fragment>
    );
}