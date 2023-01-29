use anchor_lang::prelude::*;
pub mod constant;
pub mod states;
use crate::{constant::*, states::*};

declare_id!("5vrLNwjrMTET9L4nXZ2ME5GdrS7Qk8ETExiZCpQfbaJ8");

#[program]
pub mod clever_solway {
    use super::*;

    pub fn initialize_user(
        ctx: Context<InitializeUser>
    ) -> Result<()> {
        // Initialize user profile with default data
  
        let user_profile = &mut ctx.accounts.user_profile;
        user_profile.authority = ctx.accounts.authority.key();
        user_profile.last_solway = 0;
        user_profile.solway_count = 0;

        Ok(())
    }

    pub fn add_solway(
        ctx: Context<Addsolway>, 
        location: String, 
        country: String, 
        price: String,
        img: String,
    ) -> Result<()> {
        let solway_account = &mut ctx.accounts.solway_account;
        let user_profile = &mut ctx.accounts.user_profile;

        // Fill contents with argument
        solway_account.authority = ctx.accounts.authority.key();
        solway_account.idx = user_profile.last_solway;
        solway_account.location = location;
        solway_account.country = country;
        solway_account.price = price;
        solway_account.image = img;
        solway_account.isReserved = false;

        // Increase solway idx for PDA
        user_profile.last_solway = user_profile.last_solway
            .checked_add(1)
            .unwrap();

        // Increase total solway count
        user_profile.solway_count = user_profile.solway_count
            .checked_add(1)
            .unwrap();

        Ok(())
    }

    pub fn update_solway(
        ctx: Context<Updatesolway>, 
        solway_idx: u8,
        location: String, 
        country: String, 
        price: String,
        img: String,
    ) -> Result<()> {
        let solway_account = &mut ctx.accounts.solway_account;

        // Mark todo
        solway_account.location = location;
        solway_account.country = country;
        solway_account.price = price;
        solway_account.image = img;
        Ok(())
    }

    pub fn remove_solway(ctx: Context<Removesolway>, _solway_idx: u8) -> Result<()> {
        // Decreate total solway count
        let user_profile = &mut ctx.accounts.user_profile;
        user_profile.solway_count = user_profile.solway_count
            .checked_sub(1)
            .unwrap();

        // No need to decrease last solway idx

        // Todo PDA already closed in context

        Ok(())
    }

    // Need a function that reserves an solway
    pub fn book_solway(
        ctx: Context<Booksolway>,
        idx: u8,
        date: String,
        location: String, 
        country: String, 
        price: String,
        img: String,
    ) -> Result<()> {
        let booking_account = &mut ctx.accounts.booking_account;
        
        // // Fill contents with argument
        booking_account.authority = ctx.accounts.authority.key();
        booking_account.idx = idx;
        booking_account.date = date;
        booking_account.location = location;
        booking_account.country = country;
        booking_account.price = price;
        booking_account.image = img;
        booking_account.isReserved = true;

        
        Ok(())
    }

    pub fn cancel_booking(ctx: Context<CancelBook>, _booking_idx: u8) -> Result<()> {
        // Decreate total solway count
        let user_profile = &mut ctx.accounts.user_profile;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        payer = authority,
        space = 8 + std::mem::size_of::<UserProfile>(),
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction()]
pub struct Addsolway<'info> {
    #[account(
        mut,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(
        init,
        seeds = [solway_TAG, authority.key().as_ref(), &[user_profile.last_solway]],
        bump,
        payer = authority,
        space = 2865 + 8,
    )]
    pub solway_account: Box<Account<'info, solwayAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(solway_idx: u8)]
pub struct Updatesolway<'info> {
    #[account(
        mut,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,

    #[account(
        mut,
        seeds = [solway_TAG, authority.key().as_ref(), &[solway_idx].as_ref()],
        bump,
        has_one = authority,
    )]
    pub solway_account: Box<Account<'info, solwayAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(solway_idx: u8)]
pub struct Removesolway<'info> {
    #[account(
        mut,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,
 
    #[account(
        mut,
        close = authority,
        seeds = [solway_TAG, authority.key().as_ref(), &[solway_idx].as_ref()],
        bump,
        has_one = authority,
    )]
    pub solway_account: Box<Account<'info, solwayAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

// #[derive(Accounts)]
// #[instruction()]
// pub struct Booksolway<'info> {
//     #[account(
//         mut,
//         seeds = [USER_TAG, authority.key().as_ref()],
//         bump,
//         has_one = authority,
//     )]
//     pub user_profile: Box<Account<'info, UserProfile>>,

//     #[account(
//         init,
//         seeds = [BOOK_TAG, solway_account.key().as_ref()],
//         bump,
//         payer = booking_authority,
//         space = 3125 + 8,
//     )]
//     pub booking_account: Box<Account<'info, BookingAccount>>,

//     #[account(mut)]
//     pub authority: Signer<'info>,

//     pub system_program: Program<'info, System>,
// }

#[derive(Accounts)]
#[instruction()]
pub struct Booksolway<'info> {
    #[account(
        mut,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,
    
    #[account(
        init,
        seeds = [BOOK_TAG, authority.key().as_ref() ],
        bump,
        payer = authority,
        space = 3125 + 8,
    )]
    pub booking_account: Box<Account<'info, BookingAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CancelBook<'info> {
    #[account(
        mut,
        seeds = [USER_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub user_profile: Box<Account<'info, UserProfile>>,
 
    #[account(
        mut,
        close = authority,
        seeds = [BOOK_TAG, authority.key().as_ref()],
        bump,
        has_one = authority,
    )]
    pub booking_account: Box<Account<'info, BookingAccount>>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}
