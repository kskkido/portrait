import React from 'react'
import styled from 'styled-components'

export const MacIcon = ({ imageSource, url, scale = 1 }) => {
  console.log(imageSource, 'IMAGE')

  const height = 300.0010070800781 * scale
      , width = 384 * scale

  const black = 'rgb(255, 255, 255)'
  const white = 'rgb(255, 253, 253)'

  const style = {
    storkeWidth: 0,
    stroke: black,
    fill: 'rgb(20, 19, 19)',
    transform: 'matrix(1, 0, 0, 1, 2.842170943040401e-14, 1.4210854715202004e-14)'
  }

  const rectStyle2 = {
    fill: black
  }

  const ellipseStyle = {
    fill: white
  }

  return (
    <svg viewBox="-0.000009099945600610226 1.4210854715202004e-14 384 300.0010070800781" width={width} height={height}>

      <defs>
        <pattern id="icon" height="1" width="1"  x="0" y="0" preserveAspectRatio="none">
          <image href={imageSource} />
        </pattern>
      </defs>

      <path d="M 0 0 L 0 232 L 384 232 L 384 0 L 0 0 Z" style={style} transform="matrix(1, 0, 0, 1, 2.842170943040401e-14, 1.4210854715202004e-14)" />
      <a target="_blank" href={url}>
        <rect width="360" height="200" y="15" x="12" fill="url(#icon)" />
      </a>
      <rect x="102" y="284" width="180" height="16.001" transform="matrix(1, 0, 0, 1, 2.842170943040401e-14, 1.4210854715202004e-14)" />
      <rect x="170" y="231" width="44.132" height="62" transform="matrix(1, 0, 0, 1, 2.842170943040401e-14, 1.4210854715202004e-14)" />
      <ellipse transform="matrix(-0.7071060538291931, 0.7071060538291931, -0.7071050405502319, -0.7071030139923096, 597.1436157226562, 211.54261779785156)" cx="295.995" cy="276.692" rx="6.5" ry="6.5" style={ellipseStyle} />
      <rect x="182" y="237" width="20.277" height="43" style={rectStyle2} transform="matrix(1, 0, 0, 1, 2.842170943040401e-14, 1.4210854715202004e-14)" />
    </svg>
  )

  //  <rect x="18.607" y="21.946" width="360" height="202" fill="url(#image)"></rect>
}

export const Cross = (_props) => {
  const props = Object.assign({}, _props)
  delete props.scale; delete props.innerRef

  return (
    <svg {...props} ref={_props.innerRef} viewBox="1.0000416040420532 0.9999443888664246 198.51658630371094 197.80990600585938" width={`${(_props.scale || 1) * 198.51658630371094}`} height={`${(_props.scale || 1) * 197.80990600585938}`} xmlns="http://www.w3.org/2000/svg">
      <path d="M 164.706 184.284 H 177.451 V 451.284 H 164.706 V 184.284 Z" style={{fill: 'black', strokeWidth: 2}} transform="matrix(0.7071080207824707, 0.7071050405502319, -0.7071070075035095, 0.7071070075035095, 204.34811401367188, -245.77272033691406)"/>
      <path d="M 164.706 184.283 H 177.451 V 451.283 H 164.706 V 184.283 Z" style={{fill: 'black', strokeWidth: 2}} transform="matrix(0.7071080207824707, -0.7071050405502319, 0.7071070075035095, 0.7071070075035095, -245.77268981933594, -3.8313610553741455)"/>
    </svg>

  )
}

export const Arrow = (_props) => {
  const props = Object.assign({}, _props)
  delete props.scale; delete props.innerRef

  return (
    <svg {...props} ref={_props.innerRef} viewBox="0 0 158.49600219726562 219.49998474121094" width={`${(_props.scale || 1) * 158.49600219726562}`} height={`${(_props.scale || 1) * 219.49998474121094 * 1.5}`} xmlns="http://www.w3.org/2000/svg">
      <path d="M 146.711 137 L 158.496 148.785 L 87.785 219.496 L 87.667 219.378 L 87.667 219.5 L 71 219.5 L 71 219.207 L 70.711 219.496 L 0 148.785 L 11.785 137 L 71 196.215 L 71 0 L 87.667 0 L 87.667 196.044 Z" style={{fill: 'rgb(5, 5, 5)'}} transform="matrix(1, 0, 0, 1, 0, 0)" />
    </svg>
  )
}

export const Facebook = (_props) => {
  const props = Object.assign({}, _props)
  delete props.scale; delete props.innerRef

  return (
    <svg {...props} ref={_props.innerRef} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width={`${(_props.scale || 1) * 150}`} height={`${(_props.scale || 1) * 150}`} fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414">
      <path d="M15.117 0H.883C.395 0 0 .395 0 .883v14.234c0 .488.395.883.883.883h7.663V9.804H6.46V7.39h2.086V5.607c0-2.066 1.262-3.19 3.106-3.19.883 0 1.642.064 1.863.094v2.16h-1.28c-1 0-1.195.48-1.195 1.18v1.54h2.39l-.31 2.42h-2.08V16h4.077c.488 0 .883-.395.883-.883V.883C16 .395 15.605 0 15.117 0" fillRule="nonzero" />
    </svg>
  )
}

export const Github = (_props) => {
  const props = Object.assign({}, _props)
  delete props.scale; delete props.innerRef

  return (
    <svg {...props} ref={_props.innerRef} role="img" xmlns="http://www.w3.org/2000/svg" width={`${(_props.scale || 1) * 150}`} height={`${(_props.scale || 1) * 150}`} viewBox="0 0 24 24" fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

export const Linkedin = (_props) => {
  const props = Object.assign({}, _props)
  delete props.scale; delete props.innerRef

  return (
    <svg {...props} ref={_props.innerRef} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width={`${(_props.scale || 1) * 150}`} height={`${(_props.scale || 1) * 150}`}  fillRule="evenodd" clipRule="evenodd" strokeLinejoin="round" strokeMiterlimit="1.414">
      <path d="M13.632 13.635h-2.37V9.922c0-.886-.018-2.025-1.234-2.025-1.235 0-1.424.964-1.424 1.96v3.778h-2.37V6H8.51v1.04h.03c.318-.6 1.092-1.233 2.247-1.233 2.4 0 2.845 1.58 2.845 3.637v4.188zM3.558 4.955c-.762 0-1.376-.617-1.376-1.377 0-.758.614-1.375 1.376-1.375.76 0 1.376.617 1.376 1.375 0 .76-.617 1.377-1.376 1.377zm1.188 8.68H2.37V6h2.376v7.635zM14.816 0H1.18C.528 0 0 .516 0 1.153v13.694C0 15.484.528 16 1.18 16h13.635c.652 0 1.185-.516 1.185-1.153V1.153C16 .516 15.467 0 14.815 0z" fillRule="nonzero" />
  </svg>
  )
}
