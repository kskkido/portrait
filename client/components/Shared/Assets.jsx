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
