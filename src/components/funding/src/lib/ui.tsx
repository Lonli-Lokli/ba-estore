import {
  StyledArticle,
  StyledDescription,
  StyledFunding,
  StyledImage,
} from './styles';

export function Funding() {
  return (
    <StyledFunding>
      <StyledArticle>
        <StyledImage src="favicon.svg" className="logo" />
        <StyledDescription>
          As BA E-Store does not provide good Avios datasource, I've created
          this page for all who need it.
        </StyledDescription>
        <a href="https://www.buymeacoffee.com/lonlilokliV" target="_blank" rel="noreferrer">
          <img
            src="https://cdn.buymeacoffee.com/buttons/default-orange.png"
            alt="Buy Me A Coffee"
            height="41"
            width="174"
          />
        </a>
      </StyledArticle>
    </StyledFunding>
  );
}
