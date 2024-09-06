import React from "react"
export const Location: React.FC = () => {
    return (
        <>

            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <rect width="24" height="24" fill="url(#pattern0_17_79)" />
                <defs>
                    <pattern id="pattern0_17_79" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlinkHref="#image0_17_79" transform="scale(0.01)" />
                    </pattern>
                    <image id="image0_17_79" width="100" height="100" xlinkHref="data:image/png;base64,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" />
                </defs>
            </svg>

        </>
    )
}


export const MyLocation: React.FC = () => {
    return (
        <>

            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <path fill="url(#a)" d="M0 0h24v24H0z" />
                <defs><pattern id="a" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#b" transform="scale(.01)" />
                </pattern>
                    <image id="b" width="100" height="100" xlinkHref="data:image/png;base64,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" />
                </defs>
            </svg>

        </>
    )
}