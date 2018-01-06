using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication9.Models
{
    public class BillOfLading
    {
        public static List<Container> getPremadeContainers()
        {
            return new List<Container>
            {
                new Container { Number = "TCNU1234556", Weight = 24.546, Measure = "MT", PieceCount = 832, PieceType = "BALES", Seal = "0010011" },
                new Container { Number = "KKFU9873462", Weight = 27.543, Measure = "ST", PieceCount = 832, PieceType = "BALES", Seal = "0010012" }
            };
        }
    }
}