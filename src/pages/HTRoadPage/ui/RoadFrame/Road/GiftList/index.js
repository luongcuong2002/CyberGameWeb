import React from "react";
import styles from "./gift_list.module.scss";
import CardLock from "../../../../../../assets/imgs/card_lock.png";
import ClaimBanner from "../../../../../../assets/imgs/claim_banner.png";
import ITEM from "../../../../../../enums/item.enum";
import Converter from "../../../../../../utils/converter";
import clsx from "clsx";
import RingHighlight from "../../../../../../assets/imgs/ring_highlight.png";

const Item = ({ gift, userTimedHours, index, widthItem }) => {

    const isReached = userTimedHours >= gift.requireTimedHours;
    const isReachedButNotClaimed = isReached && !gift.isClaimed;

    let quantityText = `x${gift.quantity}`;
    if (gift.type == ITEM.money) {
        quantityText = Converter.formatCurrency(gift.quantity);
    }

    return (
        <li key={index} className={styles.item} style={{ width: widthItem }}>
            <img src={RingHighlight} className={styles.itemIcon} /> dsds
            <div 
                className={
                    clsx([
                        styles.box,
                        isReachedButNotClaimed && styles.notClaimedBox
                    ])
                }
            >
                <div 
                    className={
                        clsx([
                            styles.itemBackground,
                            isReachedButNotClaimed && styles.notClaimedItemBackground
                        ])
                    } 
                />
                {
                    !isReached &&
                    <img src={CardLock} className={styles.cardLock} />
                }
                <span 
                    className={
                        clsx([
                            styles.itemQuantity,
                            isReachedButNotClaimed && styles.notClaimedItemQuantity
                        ])
                    } 
                >{quantityText}</span>
                <img src={gift.iconUrl} className={styles.itemIcon} />
                {
                    isReached && gift.isClaimed &&
                    <img src={ClaimBanner} className={styles.claimBanner} />
                }
            </div>
        </li>
    );
}

const GiftList = ({ gifts, userTimedHours, widthItem }) => {
    return (
        <ul className={styles.list} >
            {
                gifts.map(
                    (gift, index) => {
                        return (
                            <Item 
                                key={index} 
                                index={index} 
                                gift={gift} 
                                userTimedHours={userTimedHours}
                                widthItem={widthItem}
                            />
                        )
                    }
                )
            }
        </ul>
    );
}

export default GiftList;