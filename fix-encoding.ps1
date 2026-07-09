$files = @(
    'C:\Users\xlilc\.openclaw\workspace\brogroup\index.html',
    'C:\Users\xlilc\.openclaw\workspace\brogroup\resources.html',
    'C:\Users\xlilc\.openclaw\workspace\brogroup\for-professionals.html',
    'C:\Users\xlilc\.openclaw\workspace\brogroup\contact.html'
)

$patterns = @{
    'â€"'  = '&mdash;'    # em dash —
    'â€" ' = '&mdash; '   # em dash with space
    'â€™'  = "'"          # right single quote
    'â€œ'  = '&ldquo;'     # left double quote
    'â€"'  = '&rdquo;'     # right double quote
    'â„¢'  = '&trade;'     # trademark
    'Â©'   = '&copy;'      # copyright
    'Â'    = '&nbsp;'      # non-breaking space (nbsp)
}

foreach ($path in $files) {
    $content = Get-Content $path -Raw
    $original = $content
    foreach ($key in $patterns.Keys) {
        $content = $content -replace [regex]::Escape($key), $patterns[$key]
    }
    if ($content -ne $original) {
        Set-Content $path $content -NoNewline -Encoding UTF8
        Write-Output "Fixed: $path"
    } else {
        Write-Output "No changes: $path"
    }
}
