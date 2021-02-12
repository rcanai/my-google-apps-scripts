function myFunction() {
  // 開いているシートを取得
  const sheet = SpreadsheetApp.getActiveSheet();

  // 画像URLがある列を指定
  const imageUrlRange = sheet.getRange("B1:B");

  // ファイル名がある列を指定
  const fileNameRange = sheet.getRange("A1:A");

  // データが存在する最後の行数を取得
  const row = sheet.getLastRow();

  // 保存先のフォルダ
  const folder = DriveApp.getFolderById('XXXXXXXXXXXXX');

  for (let i = 1; i <= row; i++) {
    // セル情報の取得
    const url = imageUrlRange.getCell(i, 1).getValue();
    const fileName = fileNameRange.getCell(i, 1).getValue();

    // 画像データを取得
    const response = UrlFetchApp.fetch(url);
    const fileBlob = response.getBlob().setName(`image_${i}`);

    // もう1階層分フォルダを作る
    const rowFolder = folder.createFolder(fileName);

    // 画像を保存
    const file = rowFolder.createFile(fileBlob);

    console.log(`DONE: ${url}`);
  }
}
