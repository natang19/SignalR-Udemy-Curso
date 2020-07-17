using Microsoft.AspNetCore.SignalR;
using RealPromo.WebApi.Models;
using System.Threading.Tasks;

namespace RealPromo.WebApi.Hubs
{
    public class PromoHub : Hub
    {
        public async Task CadastrarPromocao(Promocao promocao)
        {
            await Clients.Caller.SendAsync("CadastradoSucesso");
            await Clients.Others.SendAsync("ReceberPromocao", promocao);
        }
    }
}
