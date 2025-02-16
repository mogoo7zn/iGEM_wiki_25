import React from 'react';
import PropTypes from 'prop-types';
import useProgressiveImg from '../../hooks/useProgressiveImg';

const ProgressiveImage = ({ src, placeholder, alt, className, ...props }) => {
  const finalSrc = useProgressiveImg(placeholder, src);

  return (
    <img
      src={finalSrc}
      alt={alt}
      className={`${className} ${finalSrc === placeholder ? 'blur' : 'blur-none'}`}
      loading="lazy"
      {...props}
    />
  );
};

ProgressiveImage.propTypes = {
  src: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default ProgressiveImage;
