import stringFormat from "../../helper/stringFormat";

interface ICard {
    item: any;
}

export default function Card({ item }: ICard) {

    if (!item || typeof item !== 'object') {
        return <div>Invalid data</div>; // Render a fallback UI for invalid data
    }

    return (
        <div className="flex w-56 h-32">
            <ul>
                {Object.keys(item).map((key, keyIndex) => (
                    <li key={keyIndex}>
                        <strong>{stringFormat(key)}: </strong>{item[key]}
                    </li>
                ))}
            </ul>
        </div>
    )
}