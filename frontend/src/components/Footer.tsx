export default function Footer() {
    return (
        <footer className="bg-white p-7">
            <div className="flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto px-4">

                <p className="text-gray-500 text-sm mb-4 sm:mb-0">
                    © 2025 DevTools. All Rights Reserved.
                </p>

                <div className="flex space-x-6">
                    <a
                        href="#"
                        className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                    >
                        Privacy
                    </a>
                    <a
                        href="#"
                        className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                    >
                        Terms
                    </a>
                    <a
                        href="#"
                        className="text-gray-500 hover:text-gray-700 transition-colors text-sm"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
}
