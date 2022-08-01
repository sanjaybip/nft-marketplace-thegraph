import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  ItemBought as ItemBoughtEvent,
  ItemListed as ItemListedEvent,
  ListingCancelled as ListingCancelledEvent,
} from "../generated/NftMarketplace/NftMarketplace";

import {
  ActiveItem,
  ItemListed,
  ItemBought,
  ListingCancelled,
} from "../generated/schema";

export function handleItemBought(event: ItemBoughtEvent): void {
  let itemBought = ItemBought.load(
    getIdFromEventParams(event.params.tokenId, event.params.marketplaceAddress)
  );

  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.marketplaceAddress)
  );

  if (!itemBought) {
    itemBought = new ItemBought(
      getIdFromEventParams(
        event.params.tokenId,
        event.params.marketplaceAddress
      )
    );
  }
  itemBought.buyer = event.params.buyer;
  itemBought.nftAddress = event.params.marketplaceAddress;
  itemBought.tokenId = event.params.tokenId;

  activeItem!.buyer = event.params.buyer;

  itemBought.save();
  activeItem!.save();
}

export function handleItemListed(event: ItemListedEvent): void {
  let itemListed = ItemListed.load(
    getIdFromEventParams(event.params.tokenId, event.params.marketplaceAddress)
  );

  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.marketplaceAddress)
  );
  if (!itemListed) {
    itemListed = new ItemListed(
      getIdFromEventParams(
        event.params.tokenId,
        event.params.marketplaceAddress
      )
    );
  }
  if (!activeItem) {
    activeItem = new ActiveItem(
      getIdFromEventParams(
        event.params.tokenId,
        event.params.marketplaceAddress
      )
    );
  }

  itemListed.seller = event.params.seller;
  activeItem.seller = event.params.seller;

  itemListed.nftAddress = event.params.marketplaceAddress;
  activeItem.nftAddress = event.params.marketplaceAddress;

  itemListed.tokenId = event.params.tokenId;
  activeItem.tokenId = event.params.tokenId;

  itemListed.price = event.params.price;
  activeItem.price = event.params.price;

  activeItem.buyer = Address.fromString(
    "0x0000000000000000000000000000000000000000"
  );

  itemListed.save();
  activeItem.save();
}

export function handleListingCancelled(event: ListingCancelledEvent): void {
  let itemCancelled = ListingCancelled.load(
    getIdFromEventParams(event.params.tokenId, event.params.marketplaceAddress)
  );

  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.marketplaceAddress)
  );

  if (!itemCancelled) {
    itemCancelled = new ListingCancelled(
      getIdFromEventParams(
        event.params.tokenId,
        event.params.marketplaceAddress
      )
    );
  }
  itemCancelled.seller = event.params.seller;
  itemCancelled.nftAddress = event.params.marketplaceAddress;
  itemCancelled.tokenId = event.params.tokenId;

  activeItem!.buyer = Address.fromString(
    "0x000000000000000000000000000000000000dEaD"
  );

  itemCancelled.save();
  activeItem!.save();
}

function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
  return tokenId.toHexString() + nftAddress.toHexString();
}
