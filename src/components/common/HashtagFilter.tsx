import { HashtagInterface } from "../../types";
import { FilterItem } from "./FilterItem";

interface Props {
    hashtags: HashtagInterface[];
    choosedHashtags: string[];
    handleChange: (value: string) => void;
}

export const HashtagFilter = ({ choosedHashtags, hashtags, handleChange }: Props) => {

    const checkIsChecked = (hashtag: string) => {
        return choosedHashtags.includes(hashtag);
    };

    const hashtagList = () => {
        return hashtags.map(h => <FilterItem key={h.id} checked={checkIsChecked(h.id)} hashtag name={h.name} value={h.id} handleChange={handleChange} />);
    };

    return (
        <div className="filter">
            <p className="filter__title">hashtagi</p>
            <ul className="filter__list">
                {hashtagList()}
            </ul>
        </div>
    );
};