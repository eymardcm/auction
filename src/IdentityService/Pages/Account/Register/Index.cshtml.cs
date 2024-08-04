using System.Security.Claims;
using IdentityModel;
using IdentityService.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace IdentityService.Pages.Register
{
    [SecurityHeaders]
    [AllowAnonymous]
    public class Index : PageModel
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public Index(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [BindProperty]
        public RegisterViewModel Input { get; set; }
        [BindProperty]
        public bool RegisterSuccess { get; set; }
        [BindProperty]
        public bool HasError { get; set; }
        [BindProperty]
        public string ErrorDescription { get; set; }

        public IActionResult OnGet(string returnUrl)
        {
            Input = new RegisterViewModel 
            { 
                ReturnUrl = returnUrl 
            };

            return Page();
        }

        public async Task<IActionResult> OnPost() {

            if (Input.Button != "register") return Redirect("~/");

            if (ModelState.IsValid) {

                var user = new ApplicationUser
                {
                    UserName = Input.UserName,
                    Email = Input.Email,
                    EmailConfirmed = true
                };

                var result = await _userManager.CreateAsync(user, Input.Password);

                if (result.Errors.Count() > 0) {
                    Console.WriteLine("There are errors.");

                    Console.WriteLine(result.Errors.FirstOrDefault().Description);
                    Console.WriteLine("count" + result.Errors.Count());

                    HasError = true;
                    ErrorDescription = result.Errors.FirstOrDefault().Description;
                }

                if (result.Succeeded) {
                    Console.WriteLine("NO errors.");
                    
                    await _userManager.AddClaimsAsync(user, new Claim[]{
                        new Claim(JwtClaimTypes.Name, Input.FullName)
                    });

                    RegisterSuccess = true;
                }
            }

            return Page();
        }
    }
}
