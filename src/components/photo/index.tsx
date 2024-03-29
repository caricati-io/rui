import styled, { css } from 'styled-components'

interface ContainerProps {
  imgSize: number
  photoStatus?: Status
  isFeatured: boolean
}

const Container = styled.figure<ContainerProps>`
  ${({ imgSize, theme, isFeatured, photoStatus }) => css`
    width: ${imgSize / 16}rem;
    height: ${imgSize / 16}rem;
    display: inline-block;
    margin: 0;
    padding: 0;
    border-radius: ${imgSize / (16 * 6)}rem;
    position: relative;

    ${isFeatured &&
    css`
      background: ${theme.color.gradientFeatured};
      padding: ${imgSize / (16 * 32)}rem;
      box-sizing: border-box;

      & > div {
        box-sizing: border-box;
        padding: ${imgSize / (16 * 22)}rem;
        background-color: ${theme.color.body};
      }
    `}

    ${photoStatus &&
    css`
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        width: ${imgSize / (16 * 3)}rem;
        height: ${imgSize / (16 * 3)}rem;
        border-radius: 50%;

        background-color: ${(() => {
          if (photoStatus === 'away') {
            return theme.color.yellow
          }
          if (photoStatus === 'busy') {
            return theme.color.red
          }
          if (photoStatus === 'online') {
            return theme.color.green
          }
          return theme.color.gray
        })()};
      }
    `}
  
    img {
      width: 100%;
      height: 100%;
      display: block;
      border-radius: ${imgSize / (16 * 10)}rem;
      object-fit: cover;
    }

    & > div {
      width: 100%;
      height: 100%;
      border-radius: ${imgSize / (16 * 7)}rem;
    }
  `}
`

const Counter = styled.span<{ imgSize: number }>`
  padding: 0 ${({ imgSize }) => `${imgSize / (16 * 8)}rem`};
  color: ${({ theme }) => theme.color.text};
  background-color: ${({ theme }) => theme.color.primary};
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: ${({ imgSize }) => `${imgSize / (16 * 4)}rem`};
  font-weight: 600;
  border-radius: ${({ imgSize }) => `${imgSize / (16 * 5)}rem`};
`

type Status = 'online' | 'busy' | 'away' | 'offline'

export interface Props {
  src: string
  alt?: string
  size?: number
  count?: number
  status?: Status
  className?: string
  featured?: boolean
}

export default function Photo({
  src,
  alt,
  status,
  size = 32,
  count = 0,
  className,
  featured = false,
}: Props) {
  return (
    <Container
      imgSize={size}
      photoStatus={status}
      className={className}
      isFeatured={featured}
    >
      <div>
        <img src={src} alt={alt} />
      </div>
      {count > 0 && status === undefined && (
        <Counter imgSize={size}>{count > 100 ? '99+' : count}</Counter>
      )}
    </Container>
  )
}
