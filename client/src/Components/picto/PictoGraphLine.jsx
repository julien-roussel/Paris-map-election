import React from 'react'

// CSS
import stylePicto from './picto.module.scss';

const PictoGraphLine = (onclick) => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 636 632" version="1.1">
        <g transform="matrix(1,0,0,1,-743.054,0)">
            <g transform="matrix(0.260995,0,0,0.561579,743.054,0)">
                <rect x="0" y="0" width="2436" height="1125" />
                <g transform="matrix(4.36899,0.0026761,-0.0131957,4.6532,-1629.55,-1499.38)">
                    <path className={stylePicto["picto-stroke"]} d="M766.71,461.658L860.19,379.243M596.022,447.88L697.237,472.385M475.007,492.827L521.767,458.083"/>
                </g>
                <g transform="matrix(4.08705,0.00250341,-0.00542555,1.91322,-125.453,278.702)">
                    <circle className={stylePicto["picto-stroke"]} cx="217.753" cy="138.469" r="50.962"/>
                </g>
                <g transform="matrix(4.08705,0.00250341,-0.00542555,1.91322,709.693,474.48)">
                    <circle className={stylePicto["picto-stroke"]} cx="217.753" cy="138.469" r="50.962"/>
                </g>
                <g transform="matrix(3.83149,0,0,1.78069,19.8168,0)">
                    <path className={stylePicto["picto-stroke"]} d="M575.36,593.107L38.921,593.107L38.921,66.563"/>
                </g>
                <g transform="matrix(3.83149,0,0,1.78069,-2847.01,0)">
                    <path className={stylePicto["picto-stroke"]} d="M1223.46,167.157L1297.29,148.779L1327.87,213.386"/>
                </g>
            </g>
        </g>
    </svg>
  )
}

export default PictoGraphLine