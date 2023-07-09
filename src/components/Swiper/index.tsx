import React, { Component, useEffect, useRef, useState } from "react";
import "./style.scss"
import { IonRippleEffect } from "@ionic/react";

interface SwiperPropsType {
    index: number,
    setIndex: Function,
    data: any[],
}

export const Swiper: React.FC<SwiperPropsType> = ({ index, setIndex, data }) => {

    const scrollRef = useRef<HTMLDivElement>(null);

    const handleItemClick = (i: number) => {
        setIndex(i);
        scrollRef.current?.scrollTo({
            top: i * 52, // 각 항목의 높이를 기준으로 스크롤 위치 계산
            behavior: "smooth",
        });
    };

    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: index * 52, // 초기 스크롤 위치 설정
            behavior: "smooth",
        });
        console.log(scrollRef.current?.scrollTop)
    }, [])
    

    return (
        <div className="sliderContainer">
            <div className="slider" ref={scrollRef}>
                <div className="item"></div>
                {data.map((sec: any, idx: number) => (
                    <div
                        className={`item ${index === idx ? "active" : ""}`}
                        key={idx}
                        onClick={() => handleItemClick(idx)}
                    >
                        <p>{sec}</p>
                    </div>
                ))}
                <div className="item"></div>
            </div>
            <div className="lineContainer">
                <div className="line1"></div>
                <div className="line2"></div>
            </div>
        </div>
    );
}