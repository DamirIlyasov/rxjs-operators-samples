export class CustomConsole {
  textArea: HTMLTextAreaElement;

  public constructor(textAreaId: string) {
    this.textArea = (document.getElementById(textAreaId) as HTMLTextAreaElement);
  }

  log(...texts) {
    let resultText = '';
    texts.forEach(text => {
      resultText += text.toString();
    });
    this.textArea.value += `\n ${resultText}`;
  }
}
