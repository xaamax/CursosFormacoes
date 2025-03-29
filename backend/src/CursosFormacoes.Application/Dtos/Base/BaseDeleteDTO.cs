using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Eventos.Application.Dtos.Base
{
    public class BaseDeleteDTO
    {
        [JsonPropertyName("inative")]
        public bool Inative { get; set; }
    }
}
