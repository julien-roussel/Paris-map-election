import React from 'react'

// CSS
import stylePicto from './picto.module.scss';

const PictoGraphLine = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 636 632" version="1.1">
        <g transform="matrix(0.260995,0,0,0.561579,0,0)">
            <rect x="0" y="0" width="2436" height="1125"/>
            <g>
                <g transform="matrix(2.78781,0,0,1.78069,-807.653,-317.072)">
                    <rect className={stylePicto["picto-fill"]} x="354.937" y="610.07" width="157.899" height="155.61"/>
                </g>
                <g transform="matrix(2.78781,0,0,3.43323,-251.628,-1582.38)">
                    <rect className={stylePicto["picto-fill"]} x="354.937" y="610.07" width="157.899" height="155.61"/>
                </g>
                <g transform="matrix(2.78781,0,0,4.11985,848.385,-2108.12)">
                    <rect className={stylePicto["picto-fill"]} x="354.937" y="610.07" width="157.899" height="155.61"/>
                </g>
                <g transform="matrix(2.78781,0,0,2.78056,310.672,-1082.65)">
                    <rect className={stylePicto["picto-fill"]} x="354.937" y="610.07" width="157.899" height="155.61"/>
                </g>
                <g transform="matrix(4.04252,0,0,1.78069,-1253,-480.863)">
                    <g transform="matrix(0.947798,-0,-0,1,309.954,270.042)">
                        <path className={stylePicto["picto-stroke"]} d="M456.979,78.3L533.319,80.346L531.273,156.686"/>
                        <path className={stylePicto["picto-stroke"]} d="M102.648,267.347L243.155,134.174L387.355,218.69C387.355,218.69 490.354,121.068 533.319,80.346" />
                    </g>
                </g>
            </g>
        </g>
    </svg>
  )
}

export default PictoGraphLine