$indexPath = 'C:\Users\xlilc\.openclaw\workspace\brogroup\index.html'
$cssPath   = 'C:\Users\xlilc\.openclaw\workspace\brogroup\css\styles.css'

# 1. Bump hero logo from 96px to 160px in index.html
$content = Get-Content $indexPath -Raw
$content = $content -replace 'width="96" height="96"', 'width="160" height="160"'
$content = $content -replace '<div class="hero-logo">', '<div class="hero-logo logo-large">'
Set-Content $indexPath $content -NoNewline
Write-Output "Updated hero logo size in index.html"

# 2. Add .logo-large CSS rule to styles.css
$css = Get-Content $cssPath -Raw

# Find the .hero-logo rule and add .logo-large after it
$newRule = @'

/* Hero logo — large variant (used on homepage) */
.logo-large img {
  width: 160px;
  height: 160px;
  filter: drop-shadow(0 8px 32px rgba(0, 0, 0, 0.5));
}
'@

# Append to end of CSS
Add-Content $cssPath $newRule -NoNewline
Write-Output "Added .logo-large CSS rule"
