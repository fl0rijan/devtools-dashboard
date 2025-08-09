interface CardProps {
    type: "bookmark" | "prompt" | "snippet";
    title: string;
    description: string;
    tags: string[];
}

export default function Card({type, title, description, tags}: CardProps) {
    const {icon, bgColor} = typeStyles[type];

    return (
        <div
            role="button"
            tabIndex={0}
            className="bg-gray-100 shadow-md rounded-lg p-6 text-left flex flex-col justify-between cursor-pointer 
                 hover:shadow-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => {
            }}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") { /* empty */
                }
            }}
        >
            <div>
                <div className={`${bgColor} w-fit p-6 rounded-xl`}>{icon}</div>

                <p className="font-bold pt-5">{title}</p>

                <p className="text-gray-500 pt-2">{description}</p>
            </div>

            <div className="flex gap-2 flex-wrap mt-4">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full"
                    >
            {tag}
          </span>
                ))}
            </div>
        </div>
    );
}


const typeStyles = {
    bookmark: {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="blue"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                />
            </svg>
        ),
        bgColor: "bg-blue-200",
    },

    prompt: {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="green"
                className="w-6 h-6"
            >
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/>
            </svg>
        ),
        bgColor: "bg-green-200",
    },

    snippet: {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="purple"
                className="w-6 h-6"
            >
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5"/>
            </svg>
        ),
        bgColor: "bg-purple-200",
    },
};