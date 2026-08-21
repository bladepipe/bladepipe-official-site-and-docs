import React from 'react';

interface ConnectorIconProps {
  icon: string;
  iconImage?: string;
  className: string;
  name?: string;
}

const ConnectorIcon: React.FC<ConnectorIconProps> = ({ icon, iconImage, className, name }) => {
  if (iconImage) {
    return <img src={iconImage} alt={name ? `${name} logo` : ''} className={`${className} object-contain`} />;
  }

  return (
    <svg className={`icon-v2 ${className}`} aria-hidden="true">
      <use href={`#icon-v2-${icon}`} xlinkHref={`#icon-v2-${icon}`} />
    </svg>
  );
};

export default ConnectorIcon;
