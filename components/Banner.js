import styled from "styled-components";
import Image from "next/image";
import Link from 'next/link'

export default function Banner() {
  return (
    <BannerSection>
      <span>
        <h2>Discover the world, stress-free with Solway</h2>
        <Link href="/" className="btn btn-dark">
          {"I'm flexible"}
        </Link>
      </span>
    </BannerSection>
  );
}

const BannerSection = styled.section`
  padding: 6rem var(--sidePadding);
  background: url(/images/banner.jpg);
  background-size: cover;
  border-radius: 1rem;
  color: var(--violet);
  span {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: var(--maxWidth);
  }
  h2 {
    font-size: clamp(1.75rem, 3vw, 2.25rem);
    line-height: 1.2;
    margin-bottom: 1.5rem;
    font-weight: 800;
  }
  .btn.btn-dark {
    --bgcolor: var(--violet);
    --color: var(--yellow);
  }

  @media (max-width: 36rem) {
    aspect-ratio: 0.75;
    background: url(images/banner-sm.jpg);
    background-size: cover;
    background-position: center;

    span {
      align-items: center;
      text-align: center;
    }
  }
`;
