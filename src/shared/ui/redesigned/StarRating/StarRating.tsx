import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useState } from 'react';
import { Icon } from '../../deprecated/Icon/Icon';
import cls from './StarRating.module.scss';
import starIcon from '../../../assets/icons/starIcon.svg';

interface StarRatingProps {
    className?: string;
    onSelect?: (starCount: number) => void;
    selectedStars?: number;
    size?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = (props: StarRatingProps) => {
    const {
        className, size = 30, selectedStars = 0, onSelect,
    } = props;
    const [currentCountStars, setCurrentCountStars] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));
    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentCountStars(starsCount);
        }
    };
    const onLeave = () => {
        if (!isSelected) {
            setCurrentCountStars(0);
        }
    };
    const onClickHandler = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setCurrentCountStars(starsCount);
            setIsSelected(true);
        }
    };
    return (
        <div className={classNames(cls.StarRating, {}, [className])}>
            {stars.map((starNumber) => (
                <Icon
                    className={classNames(
                        cls.starIcon,
                        { [cls.selected]: isSelected },
                        [currentCountStars >= starNumber ? cls.hovered : cls.normal],
                    )}
                    Svg={starIcon}
                    key={starNumber}
                    width={size}
                    height={size}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(starNumber)}
                    onClick={onClickHandler(starNumber)}
                />
            ))}
        </div>
    );
};
