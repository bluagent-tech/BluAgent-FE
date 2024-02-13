using System;
using System.IO;
using System.Text;

namespace BAv02.Models.Tools
{
    public class HTMLReader
    {
        public string ReadHtmlFile(string htmlFilePath)
        {
            string htmlText = string.Empty;
            try
            {
                using (StreamReader template = new StreamReader(htmlFilePath))
                {
                    htmlText = ConvertHtmlToString(template, false);
                    template.Close();
                }
            }
            catch (Exception)
            {

            }
            return htmlText;
        }

        private string ConvertHtmlToString(TextReader streamToRead, bool isHtml)
        {
            StringBuilder body = new StringBuilder();
            StringBuilder nextTag = new StringBuilder();
            bool inTag = false;
            char nextCharacter = char.MinValue;
            char tagStart = '$';

            while (streamToRead.Peek() >= 0)
            {
                nextCharacter = Convert.ToChar(streamToRead.Peek());
                if (nextCharacter.Equals(tagStart)) inTag = !inTag;

                if (inTag)
                {
                    nextTag.Append(Convert.ToChar(streamToRead.Read()));
                    if (nextTag.Length >= 50)
                    {
                        body.Append(nextTag.ToString());
                        nextTag.Length = 0;
                        inTag = false;
                    }
                }
                else if (nextTag.Length > 0)
                {
                    if (nextCharacter.Equals(tagStart)) nextTag.Append(Convert.ToChar(streamToRead.Read()));
                    body.Append(ReplaceHtmlValues(nextTag.ToString(), isHtml));
                    nextTag.Length = 0;
                }
                else
                {
                    body.Append(Convert.ToChar(streamToRead.Read()));
                }
            }

            return body.ToString();
        }

        private string ReplaceHtmlValues(string tag, bool isHtml)
        {
            string returnValue = string.Empty;
            tag = tag.Trim();

            switch (tag)
            {
                case "$Employee$":
                    returnValue = "Employee Name";
                    break;
            }
            return returnValue;
        }
    }
}
