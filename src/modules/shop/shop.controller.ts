import { Controller, Get, InternalServerErrorException, Logger, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Constants } from 'src/common';
import { DefaultRoles, SuccessMessage } from 'src/data';
import { AuthorizedRoles } from 'src/utilities';
import { AccessJwtGuard, RoleGuard } from '../shared/guards';
import { ShopService } from './shop.service';

@ApiBearerAuth(Constants.API_AUTH_NAME)
@Controller('shop')
export class ShopController {
    private logger = new Logger('ShopController');

    constructor(private shopService: ShopService) { }

    @Post(`${Constants.ADD_PATH}`)
    @AuthorizedRoles(DefaultRoles.SuperAdmin, DefaultRoles.Admin, DefaultRoles.Seller)
    @UseGuards(AccessJwtGuard, RoleGuard)
    @ApiOperation({ summary: 'Add shops', tags: [Constants.SHOP_TAG] })
    @ApiResponse({ status: 200, description: 'Shops Added', type: String })
    addShop(): Promise<string> {
        try {
            return Promise.resolve(SuccessMessage.ShopItemsAddedSuccessfully);
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException();
        }
    }

    @Post(`${Constants.ADD_TO_CART}`)
    @AuthorizedRoles(DefaultRoles.SuperAdmin, DefaultRoles.Admin, DefaultRoles.Buyer)
    @UseGuards(AccessJwtGuard, RoleGuard)
    @ApiOperation({ summary: 'Add shops', tags: [Constants.SHOP_TAG] })
    @ApiResponse({ status: 200, description: 'Shops Added', type: String })
    addItemToCart(): Promise<string> {
        try {
            return Promise.resolve(SuccessMessage.ItemsAddedToCartSuccessfully);
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException();
        }
    }

    @Get(`${Constants.ALL_SHOPS}`)
    @UseGuards(AccessJwtGuard)
    @ApiOperation({ summary: 'List shops', tags: [Constants.SHOP_TAG] })
    @ApiResponse({ status: 200, description: 'Shops Listed', type: String })
    getAllUsers(): Promise<string> {
        try {
            return Promise.resolve(SuccessMessage.ShopItemsListedSuccessfully);
        } catch (error) {
            this.logger.error(error);
            throw new InternalServerErrorException();
        }
    }
}
