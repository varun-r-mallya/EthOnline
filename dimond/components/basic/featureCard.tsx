import { FC } from 'react';

import DecentralizedNetwork from "@/app/DecentralizedNetwork.svg";

interface FeatureCardProps {
    // svg: FC<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
}
const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
    return (
        <div
            className="flex flex-col justify-start items-center w-[258px] relative gap-[7px] px-[13px] py-[17px] rounded-[11px] bg-gradient-to-b from-[#1b211f] to-[#101517]"
        >
            <div
                className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 w-[139px] relative gap-[7px]"
            >
                <DecentralizedNetwork />
                <p
                    className="self-stretch flex-grow-0 flex-shrink-0 w-[139px] text-xl font-medium text-left text-[#bafd02]"
                >
                    {title}
                </p>
            </div>
            <p
                className="self-stretch flex-grow-0 flex-shrink-0 w-[232px] text-base font-light text-center text-[#bcbcbc]"
            >
                {description}        </p>
        </div>
    )
};

export default FeatureCard