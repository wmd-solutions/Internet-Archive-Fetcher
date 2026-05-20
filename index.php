<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
      crossorigin="anonymous"
    />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">
    <title>Archie.org letöltések</title>
  </head>
  <body>
    <div class="col-lg-8 mx-auto p-3 py-md-5">
      <?php
        $fp = @fopen('archive.txt', 'r'); 

        // Add each line to an array
        if ($fp) {
          $archives = explode("\n", fread($fp, filesize('archive.txt')));
        }
        else
        {
          $archives = array();
        }

        $i = 0;
        foreach ( $archives as $archive )
        {
          $i++;
      ?>
      <header class="d-flex flex-column align-items-start pb-3 mb-5 border-bottom archive-header px-2 pt-3 bg-warning-subtle" id="ah<?=$i?>">
        <div class="spinner-border" role="status"><span class="sr-only"></span></div>
        <span class="fs-4 archive-title"></span>
        <span class="fs-5 archive-description"></span>
      </header>
      <main class="archive-main" id="am<?=$i?>" data-header="#ah<?=$i?>" data-archive="<?=$archive?>">
        <div class="d-flex flex-column align-items-start pb-3 mb-5 archive-links"></div>
      </main>

      <?php } ?>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <script src="archive_dumper.js?<?=filemtime(__DIR__ . '/archive_dumper.js')?>"></script>
  </body>
</html>
