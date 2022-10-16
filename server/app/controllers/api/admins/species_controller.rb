module Api
  module Admins
    class SpeciesController < ApplicationController
      before_action :auth?, except: :index
      before_action :set_user
      before_action :find_species, only: [:show, :update, :destroy]

      def show
        response_success(@species, { serializer: ::Categories::ShowSerializer })
      end

      def index
        # binding.pry
        species = Species.includes(:image_blob).order(id: :desc).ransack(params[:q]).result
        @pagy, @species = pagy(species, items: params[:per_page] || DEFAULT_PER_PAGE, page: params[:page] || DEFAULT_PAGE)

        response_list(@species, { adapter: :json,
                                  each_serializer: ::Categories::ShowSerializer })
      end

      def create
        form = ::Admins::SpeciesForm.new.assign_model(Species.new, species_params.to_h)

        if form.save
          response_success(form.model, { serializer: ::Categories::ShowSerializer })
        else
          response_error(form.errors.to_hash(true))
        end
      end

      def update
        form = ::Admins::SpeciesForm.new.assign_model(@species, species_params.to_h)

        if form.save
          response_success(form.model, { serializer: ::Categories::ShowSerializer })
        else
          response_error(form.errors.to_hash(true))
        end
      end

      def destroy
        @species.destroy!
        response_success(@species)
      end

      private

      def species_params
        params.require(:species).permit(:name, :description).merge(params.permit(:image_key))
      end

      def find_species
        @species = Species.find(params[:id])
      end

      def set_user
        @user = Current.user
      end

      def error_message
        response_error(error: :error)
      end

      def auth?
        authenticate!(:customer)
      end
    end
  end
end
