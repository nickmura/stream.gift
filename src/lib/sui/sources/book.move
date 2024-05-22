module book::transfer_to_sender {
    use sui::event;

    public struct Donation has copy, drop {
        from: address,
        to: address,
        amount: u64,

    }


    public entry fun tip(recipient: address, amount: u64, ctx: &mut tx_context::TxContext)  {
        event::emit(Donation {
            from: ctx.sender(),
            to: recipient,
            amount: amount
        });

    }
}