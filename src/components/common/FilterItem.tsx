interface Props {
    checked: boolean;
    name: string;
    value: string;
    hashtag?: boolean;
    handleChange: (value: string) => void;
}

export const FilterItem = ({ checked, name, hashtag, value, handleChange }: Props) => {
    return (
        <li className={`filter__item${checked ? ' checked' : ''}`} onClick={() => handleChange(value)}>
            {hashtag && '#'}{name}
        </li>
    );
};