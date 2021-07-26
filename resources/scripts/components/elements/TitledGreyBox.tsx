import React, { memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import tw from 'twin.macro';
import isEqual from 'react-fast-compare';

interface Props {
    icon?: IconProp;
    title: string | React.ReactNode;
    className?: string;
    children: React.ReactNode;
}

const TitledGreyBox = ({ icon, title, children, className }: Props) => (
    <div css={tw`rounded shadow-md bg-neutral-700 bg-opacity-50`} className={className} style={{backdropFilter: "blur(20px)"}}>
        <div css={tw`rounded-t p-3 border-b border-neutral-700`}>
            {typeof title === 'string' ?
                <p css={tw`text-sm uppercase`}>
                    {icon && <FontAwesomeIcon icon={icon} css={tw`mr-2 text-neutral-300`}/>}{title}
                </p>
                :
                title
            }
        </div>
        <div css={tw`p-3`}>
            {children}
        </div>
    </div>
);

export default memo(TitledGreyBox, isEqual);
