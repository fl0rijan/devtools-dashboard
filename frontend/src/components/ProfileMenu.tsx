import {Popover, PopoverButton, PopoverPanel} from '@headlessui/react'
import {ChevronDownIcon, Cog6ToothIcon, LockClosedIcon} from '@heroicons/react/20/solid'

export default function ProfileMenu({onLogout}: { onLogout: () => void }) {
    const options = [
        {name: 'Settings', href: '#', icon: Cog6ToothIcon},
        {name: 'Logout', href: '#', icon: LockClosedIcon, action: onLogout},
    ]

    return (
        <Popover className="relative">
            <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold text-gray-900">
                <img
                    className="h-12 w-12 rounded-full object-cover border-2 border-gray-300 hover:border-blue-500 transition"
                    alt="profile"
                    src="src/assets/profile-picture-default.jpg"
                />
                <ChevronDownIcon aria-hidden="true" className="w-5 h-5"/>
            </PopoverButton>

            <PopoverPanel
                className="absolute left-1/2 z-10 mt-2 w-40 -translate-x-1/2 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="py-2">
                    {options.map((item) =>
                        item.action ? (
                            <button
                                key={item.name}
                                onClick={item.action}
                                className="flex w-full items-center gap-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-700"
                            >
                                <item.icon className="w-5 h-5 text-gray-400" aria-hidden="true"/>
                                {item.name}
                            </button>
                        ) : (
                            <a
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <item.icon className="w-5 h-5 text-gray-400" aria-hidden="true"/>
                                {item.name}
                            </a>
                        )
                    )}
                </div>
            </PopoverPanel>
        </Popover>
    )
}
