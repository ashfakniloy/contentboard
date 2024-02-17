export const cssCode = `.ContentBoard > * + * {
  padding-top: 16px;
}

.ContentBoard h1,
.ContentBoard h2,
.ContentBoard h3,
.ContentBoard h4,
.ContentBoard h5,
.ContentBoard h6 {
  line-height: 1.1;
}

.ContentBoard > h1 {
  font-size: 32px;
  font-weight: bold;
}

.ContentBoard > h2 {
  font-size: 24px;
  font-weight: bold;
}

.ContentBoard > h3 {
  font-size: 20.8px;
  font-weight: bold;
}

.ContentBoard > h4 {
  font-size: 16px;
  font-weight: bold;
}

.ContentBoard > h5 {
  font-size: 12.8px;
  font-weight: bold;
}

.ContentBoard > h6 {
  font-size: 11.2px;
  font-weight: bold;
}

.ContentBoard > p {
  font-size: 16px;
}

.ContentBoard > ul {
  margin-left: 20px;
  list-style-type: disc;
}

.ContentBoard > ol {
  margin-left: 20px;
  list-style-type: decimal;
}

.ContentBoard ul,
.ContentBoard ol {
  padding: 16px 0px;
}

.ContentBoard code {
  background-color: transparent;
}

.ContentBoard pre {
  background-color: #0d0d0d;
  color: white;
  font-family: "JetBrainsMono", monospace;
  padding: 12px 16px;
  border-radius: 8px;
  overflow-x: auto;
}

.ContentBoard pre code {
  font-size: 14px;
  color: #ffcc00;
  background-color: #0d0d0d;
}


.ContentBoard img {
  height: auto !important;
  cursor: default !important;
  max-width: 100%;
  display: inline;
}

.ContentBoard a {
  color: #0074d9;
  text-decoration: underline;
  transition: color 200ms;
}

.ContentBoard blockquote {
  padding-left: 16px;
  border-left: 2px solid #9c9c9c;
}

.ContentBoard hr {
  margin: 32px 0px;
  border-top: 1px solid #ccc;
}

.ContentBoard iframe {
  max-width: 100%;
}

@media only screen and (max-width: 480px) {
  .ContentBoard div[data-youtube-video] > iframe {
    max-height: 250px;
  }
}`;
