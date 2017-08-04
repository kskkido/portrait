import React from 'react'
import styled from 'styled-components'

export const MacIcon = ({ imageSource, scale = 1 }) => {
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
        <pattern id="image" height="1" width="1"  x="0" y="0" preserveAspectRatio="none">
          <image href={imageSource} />
        </pattern>
      </defs>

      <path d="M 0 0 L 0 232 L 384 232 L 384 0 L 0 0 Z" style={style} transform="matrix(1, 0, 0, 1, 2.842170943040401e-14, 1.4210854715202004e-14)" />
      <rect width="360" height="200" y="15" x="12" fill="url(#image)" />
      <rect x="102" y="284" width="180" height="16.001" transform="matrix(1, 0, 0, 1, 2.842170943040401e-14, 1.4210854715202004e-14)" />
      <rect x="170" y="231" width="44.132" height="62" transform="matrix(1, 0, 0, 1, 2.842170943040401e-14, 1.4210854715202004e-14)" />
      <ellipse transform="matrix(-0.7071060538291931, 0.7071060538291931, -0.7071050405502319, -0.7071030139923096, 597.1436157226562, 211.54261779785156)" cx="295.995" cy="276.692" rx="6.5" ry="6.5" style={ellipseStyle} />
      <rect x="182" y="237" width="20.277" height="43" style={rectStyle2} transform="matrix(1, 0, 0, 1, 2.842170943040401e-14, 1.4210854715202004e-14)" />
    </svg>
  )

  //  <rect x="18.607" y="21.946" width="360" height="202" fill="url(#image)"></rect>
}
