import styled from "styled-components";

export const media = {
    mobileWithImage: 'only screen and (max-width: 1150px)',
    mobile: 'only screen and (max-width: 390px)'
};


export const TitleLg = styled.div`
  font-size: 5rem;
  font-weight: 600;
  font-family: Georgia;
  
  @media ${media.mobile}{
    font-size: 1.875rem;
    font-weight: 600;
    font-family: Georgia;
  }
`;

export const TitleMd = styled.div`
  font-size: 2.25rem;
  font-weight: 600;
  
  @media ${media.mobile}{
    font-size: 1.625rem;
    font-weight: 600;
  }
`;

export const TitleSm = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  @media ${media.mobile}{
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

export const TextLg = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  font-family: Georgia;
  
  @media ${media.mobile}{
    font-size: 1.125rem;
    font-weight: 600;
  }
`;

export const TextMd = styled.div`
  font-size: 1rem;
  font-weight: normal;
  font-family: Georgia;
  
  @media ${media.mobile}{
    font-size: 1.125rem;
    font-weight: normal;
  }
`;

export const TextSm = styled.div`
  font-size: 0.875rem;
  font-weight: normal;
  @media ${media.mobile}{
    font-size: 1rem;
    font-weight: normal;
  }
`;

export const Caption = styled.div`
  font-size: 0.75rem;
  font-weight: normal;
  @media ${media.mobile}{
    font-size: 0.875rem;
    font-weight: normal;
  }
`;
