using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Text_2_Morse
{
    class Morse
    {
        string inp;
        string outp="";

        public void converttm(string i)
        {
            inp = i;
            int len = inp.Length;
            for (int x = 0; x < len; x++)
            {
                char a = inp[x];
                switch (char.ToLower(a))
                {
                    case 'a' : outp += ".- ";
                        break;
                    case 'b': outp += "-... ";
                        break;
                    case 'c': outp += "-.-. ";
                        break;
                    case 'd': outp += "-.. ";
                        break;
                    case 'e': outp += ". ";
                        break;
                    case 'f': outp += "..-. ";
                        break;
                    case 'g': outp += "--. ";
                        break;
                    case 'h': outp += ".... ";
                        break;
                    case 'i': outp += ".. ";
                        break;
                    case 'j': outp += ".--- ";
                        break;
                    case 'k': outp += "-.- ";
                        break;
                    case 'l': outp += ".-.. ";
                        break;
                    case 'm': outp += "-- ";
                        break;
                    case 'n': outp += "-. ";
                        break;
                    case 'o': outp += "--- ";
                        break;
                    case 'p': outp += ".--. ";
                        break;
                    case 'q': outp += "--.- ";
                        break;
                    case 'r': outp += ".-. ";
                        break;
                    case 's': outp += "... ";
                        break;
                    case 't': outp += "- ";
                        break;
                    case 'u': outp += "..- ";
                        break;
                    case 'v': outp += "...- ";
                        break;
                    case 'w': outp += ".-- ";
                        break;
                    case 'x': outp += "-..- ";
                        break;
                    case 'y': outp += "-.-- ";
                        break;
                    case 'z': outp += "--.. ";
                        break;
                    case ' ': outp += "/ ";
                        break;
                    case '1': outp += ".---- ";
                        break;
                    case '2': outp += "..--- ";
                        break;
                    case '3': outp += "...-- ";
                        break;
                    case '4': outp += "....- ";
                        break;
                    case '5': outp += "..... ";
                        break;
                    case '6': outp += "-.... ";
                        break;
                    case '7': outp += "--... ";
                        break;
                    case '8': outp += "---.. ";
                        break;
                    case '9': outp += "----. ";
                        break;
                    case '0': outp += "----- ";
                        break;
                    default : outp += a.ToString() + " ";
                        break;
                }
            }
        }

       public string outval()
        {
            return outp;
        }
    }
}
